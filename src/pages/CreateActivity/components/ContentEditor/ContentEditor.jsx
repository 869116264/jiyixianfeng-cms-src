import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, DatePicker, NumberPicker } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import axios from 'axios';

axios.defaults.withCredentials = true;

import { Feedback } from '@icedesign/base/index';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部', '研究生第十三党支部', '研究生第十四党支部', '研究生第十五党支部', '研究生第十六党支部', '研究生第十七党支部'];
const statusList = ['保存草稿状态', '报名开始', '报名结束', '活动即将开始', '进行中', '已结束'];
const stageList = ['所有人', '仅入党申请人', '仅推优对象', '仅积极分子', '仅发展对象', '仅预备党员', '仅正式党员', '仅党员/预备党员', '仅非党员'];

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    console.log('excuse me???');
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
    };
  }

  openCoordinatePage = () => {
    // this.setState({
    //   modalOpen: true,
    // });
    window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html', 'target');
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }
      // console.log(values.title);
      const bodyFormData = new FormData();
      bodyFormData.set('title', values.title);
      bodyFormData.set('type', values.cats);
      bodyFormData.set('hours', values.hours);
      bodyFormData.set('content', values.text);
      bodyFormData.set('stage', values.now_stage);
      bodyFormData.set('state', values.state);
      bodyFormData.set('party_branch', values.party_branch);
      bodyFormData.set('location', values.location);
      bodyFormData.set('start_time', values.time[0]);
      bodyFormData.set('end_time', values.time[1]);
      bodyFormData.set('start_sign_time', values.register_time[0]);
      bodyFormData.set('end_sign_time', values.register_time[1]);
      bodyFormData.set('coordinate', values.coordinate);
      bodyFormData.set('max_people_number', values.max_people_number);
      // console.log(bodyFormData);
      if (values.comment === null || values.comment === 'null') {
        bodyFormData.set('comment', '');
      } else {
        bodyFormData.set('comment', values.comment);
      }
      axios({
        method: 'POST',
        url: 'https://igulu.net/api/activity/add',
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(function (response) {
          console.log('succ', response);
          if (response.data.code === 200) {
            window.location.href = 'http://jyxf.igulu.net/#/activity/activitylist';
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
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer title="发起活动">
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="填写文章标题"/>
                    </IceFormBinder>
                    <IceFormError name="title"/>
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
                  <FormItem label="进展阶段" required>
                    <IceFormBinder
                      name="state"
                      required
                      message="阶段必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择活动进展阶段"
                        dataSource={[
                          { label: statusList[0], value: '1' },
                          { label: statusList[1], value: '2' },
                          { label: statusList[2], value: '3' },
                          { label: statusList[3], value: '4' },
                          { label: statusList[5], value: '6' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map((item) => item.message)
                                .join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么阶段？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="活动地点" required>
                    <IceFormBinder
                      name="location"
                      required
                      message="活动地点必填"
                    >
                      <Input placeholder="填写活动地点"/>
                    </IceFormBinder>
                    <IceFormError name="location"/>
                  </FormItem>
                </Col>
                <Col span="5" offset="2">
                  <FormItem label="活动坐标" required>
                    <IceFormBinder
                      name="coordinate"
                      required
                      message="活动地点必填"
                    >
                      <Input placeholder="填写活动坐标"/>
                    </IceFormBinder>
                    <IceFormError name="location"/>
                  </FormItem>
                </Col>
                <Col span="2" offset="1">
                  <FormItem label="获取坐标">
                    <Button onClick={this.openCoordinatePage}>获取</Button>
                  </FormItem>
                </Col>
                <Col span="6" offset="1">
                  <FormItem label="活动类型" required>
                    <IceFormBinder
                      name="cats"
                      required
                      message="分类必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择活动类型"
                        dataSource={[
                          { label: '组织生活', value: '1' },
                          { label: '理论学习', value: '2' },
                          { label: '实践学习', value: '3' },
                          { label: '其他活动', value: '4' },
                          { label: '专题培训', value: '5' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map((item) => item.message)
                                .join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="活动学时" required>
                    <IceFormBinder
                      name="hours"
                      required
                      message="活动学时必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择活动学时"
                        dataSource={[
                          { label: '0 学时', value: '0' },
                          { label: '1 学时', value: '1' },
                          { label: '2 学时', value: '2' },
                          { label: '3 学时', value: '3' },
                          { label: '4 学时', value: '4' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map((item) => item.message)
                                .join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
                <Col span="6" offset="2">
                  <FormItem label="党支部限制" required>
                    <IceFormBinder
                      name="party_branch"
                      required
                      message="党支部限制必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择党支部限制"
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
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map((item) => item.message)
                                .join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
                <Col span="6" offset="2">
                  <FormItem label="发展阶段限制" required>
                    <IceFormBinder
                      name="now_stage"
                      required
                      message="发展阶段限制必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择发展阶段限制"
                        dataSource={[
                          { label: stageList[0], value: '0' },
                          { label: stageList[1], value: '1' },
                          { label: stageList[2], value: '2' },
                          { label: stageList[3], value: '3' },
                          { label: stageList[4], value: '4' },
                          { label: stageList[5], value: '5' },
                          { label: stageList[6], value: '6' },
                          { label: stageList[7], value: '7' },
                          { label: stageList[8], value: '8' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map((item) => item.message)
                                .join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="8">
                  <FormItem label="活动起止时间" required>
                    <IceFormBinder
                      name="time"
                      type="array"
                      // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                      valueFormatter={(date, dateStr) => dateStr}
                    >
                      <RangePicker showTime/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col span="8" offset="2">
                  <FormItem label="报名起止时间" required>
                    <IceFormBinder
                      name="register_time"
                      type="array"
                      // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                      valueFormatter={(date, dateStr) => dateStr}
                    >
                      <RangePicker showTime/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col span="4" offset="1">
                  <FormItem label="人数上限" required>
                    <IceFormBinder
                      name="max_people_number"
                      required
                      message="人数上限必填"
                    >
                      <Input placeholder="填写人数上限"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col>
                  <FormItem label="内容">
                    <IceFormBinder name="text">
                      <Input multiple placeholder="请填写活动内容"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="11">
                  <FormItem label="备注">
                    <IceFormBinder name="comment">
                      <Input multiple placeholder="请填写活动备注"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  发布活动
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
  formLabel: {
    width: '100%',
  },
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
