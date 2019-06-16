import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Form,
} from '@icedesign/base';
import axios from 'axios';
import { Feedback } from '@icedesign/base/index';

const FormItem = Form.Item;
const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部', '研究生第十三党支部', '研究生第十四党支部', '研究生第十五党支部', '研究生第十六党支部', '研究生第十七党支部'];
const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};

export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        number: '',
        password: '',
        party_id: '',
      },
    };
  }

  onFormChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        name: '',
        area: 'location1',
        time: [],
        delivery: false,
        type: ['地推活动'],
        resource: '线下场地免费',
        extra: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        return false;
      }
      const bodyFormData = new FormData();
      bodyFormData.set('level', 1);
      bodyFormData.set('number', value.number);
      bodyFormData.set('password', value.password);
      bodyFormData.set('party_branch_id', value.party_id);
      bodyFormData.set('name', value.name);
      axios({
        method: 'POST',
        url: 'https://igulu.net/api/administer/add',
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(function (response) {
          console.log('succ', response);
          if (response.data.code === 200) {
            window.location.href = 'http://jyxf.igulu.net/#/admin/adminlist';
            Feedback.toast.success('创建成功');
            return true;
          } else {
            Feedback.toast.error('创建失败');
            return false;
          }
        })
        .catch(function (error) {
          console.log('err', error);
          Feedback.toast.error('创建失败');
          return false;
        });
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="创建管理员" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >


            <div>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  姓名：
                </Col>

                <Col s="12" l="10">
                  <IceFormBinder
                    name="name"
                    required
                    message="活动名称必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
                  </IceFormBinder>
                  <IceFormError name="name"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  账号：
                </Col>

                <Col s="12" l="10">
                  <IceFormBinder
                    name="number"
                    required
                    message="活动名称必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
                  </IceFormBinder>
                  <IceFormError name="name"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  密码：
                </Col>

                <Col s="12" l="10">
                  <IceFormBinder
                    name="password"
                    required
                    message="活动名称必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
                  </IceFormBinder>
                  <IceFormError name="name"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  党支部：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="party_id">
                    <Select
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: branchList[0], value: '0' },
                        { label: branchList[1], value: '1' },
                        { label: branchList[2], value: '2' },
                        { label: branchList[3], value: '3' },
                        { label: branchList[4], value: '4' },
                        { label: branchList[5], value: '5' },
                        { label: branchList[6], value: '6' },
                        { label: branchList[7], value: '7' },
                        { label: branchList[8], value: '8' },
                        { label: branchList[9], value: '9' },
                        { label: branchList[10], value: '10' },
                        { label: branchList[11], value: '11' },
                        { label: branchList[12], value: '12' },
                        { label: branchList[13], value: '13' },
                        { label: branchList[14], value: '14' },
                        { label: branchList[15], value: '15' },
                        { label: branchList[16], value: '16' },
                        { label: branchList[17], value: '17' },
                        { label: branchList[18], value: '18' },
                        { label: branchList[19], value: '19' },
                        { label: branchList[20], value: '20' },
                        { label: branchList[21], value: '21' },
                        { label: branchList[22], value: '22' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <FormItem label=" ">
                <Button type="primary" onClick={this.submit}>
                  提交信息
                </Button>
              </FormItem>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
