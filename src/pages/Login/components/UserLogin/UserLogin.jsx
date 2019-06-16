/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Feedback } from '@icedesign/base';
import { Link } from 'react-router';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';

axios.defaults.withCredentials = false;

const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: undefined,
        password: undefined,
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        e.preventDefault();
        return false;
      }
      console.log('values:', values);
    });
    const bodyFormData = new FormData();
    bodyFormData.set('number', this.state.value.account);
    bodyFormData.set('password', this.state.value.password);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/administer/signIn',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        console.log('succ', response);
        if (response.data.code === 200) {
          window.location.href = 'http://jyxf.igulu.net/#/activity/activityList';
          Feedback.toast.success('登录成功');
          return true;
        } else {
          Feedback.toast.error(response.data.content);
        }
      })
      .catch(function (error) {
        console.log('err', error);
        Feedback.toast.error('网络错误');
        return false;
      });
  };

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br/> 同同同学 <br/> 正式版v1.0
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="account" required message="必填">
                      <Input maxLength={20} placeholder="会员名/邮箱/手机号"/>
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account"/>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password" required message="必填">
                      <Input htmlType="password" placeholder="密码"/>
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="password"/>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="checkbox">
                      <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Link to="activity/createactivity">
                    <Button
                      type="primary"
                      onClick={this.handleSubmit}
                      style={styles.submitBtn}
                    >
                      登 录
                    </Button>
                  </Link>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
