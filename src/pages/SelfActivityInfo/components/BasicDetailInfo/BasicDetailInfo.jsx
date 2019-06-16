import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Feedback } from '@icedesign/base';
import axios from 'axios';
import { Form } from '@icedesign/base/index';

axios.defaults.withCredentials = true;

const { Row, Col } = Grid;
const FormItem = Form.Item;
/**
 * 渲染详情信息的数据
 */

const activityType = ['未选择', '组织生活', '理论学习', '社会实践', '其他活动', '专题培训'];

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: {
        student_id: '',
        name: '',
        type: '',
        host: '',
        location: '',
        hours: '',
        content: '',
        experience_title: '',
        experience: '',
      },
      id: window.location.href.split('=')[1],
    };
    this.loadData();
    console.log(window.location.href.split('=')[1]);
  }

  loadData = () => {
    var t = this;
    const bodyFormData = new FormData();
    bodyFormData.set('id', this.state.id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/administer/getAutonomousActivity',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        console.log(response);
        t.setState({
          data: response.data,
        });
      });
    console.log(this.state);
  };

  agree = () => {
    var t = this;
    const bodyFormData = new FormData();
    bodyFormData.set('activity_id', this.state.id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/administer/passAutonomousActivity',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        Feedback.toast.success('通过～');
        window.location.href = 'http://jyxf.igulu.net/#/self/list';
      });
  };

  disagree = () => {
    var t = this;
    const bodyFormData = new FormData();
    bodyFormData.set('activity_id', this.state.id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/administer/denyAutonomousActivity',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        Feedback.toast.success('没通过～');
        window.location.href = 'http://jyxf.igulu.net/#/self/list';
      });
  };

  render = () => {
    return (
      <IceContainer>
        <h2 style={styles.basicDetailTitle}>活动详情</h2>

        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>基本信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>学号：</span>
              <span style={styles.infoItemValue}>{this.state.data.student_id}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动名称：</span>
              <span style={styles.infoItemValue}>{this.state.data.name}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动类型：</span>
              <span style={styles.infoItemValue}>{activityType[this.state.data.type]}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>主办方：</span>
              <span style={styles.infoItemValue}>{this.state.data.host}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动地点：</span>
              <span style={styles.infoItemValue}>{this.state.data.location}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动学时：</span>
              <span style={styles.infoItemValue}>{this.state.data.hours}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动内容：</span>
              <span style={styles.infoItemValue}>{this.state.data.content}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>心得名称：</span>
              <span style={styles.infoItemValue}>{this.state.data.experience_title}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>心得内容：</span>
              <span style={styles.infoItemValue}>{this.state.data.experience}</span>
            </Col>
          </Row>
        </div>
        <FormItem label=" ">
          <Button type="primary" onClick={this.agree}>
            通过审核
          </Button>
          <Button type="danger" onClick={this.disagree}>
            不通过审核
          </Button>
        </FormItem>
      </IceContainer>
    );
  };
}

const styles = {
  basicDetailTitle: {
    margin: '10px 0',
    fontSize: '16px',
  },
  infoColumn: {
    marginLeft: '16px',
  },
  infoColumnTitle: {
    margin: '20px 0',
    paddingLeft: '10px',
    borderLeft: '3px solid #3080fe',
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px',
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px',
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999',
  },
  infoItemValue: {
    color: '#333',
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
};
