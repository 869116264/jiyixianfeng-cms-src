import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Feedback } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { DatePicker } from '@icedesign/base/index';
import axios from 'axios';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部', '研究生第十三党支部', '研究生第十四党支部', '研究生第十五党支部', '研究生第十六党支部', '研究生第十七党支部'];
const statusList = ['保存草稿状态', '报名开始', '报名结束', '活动即将开始', '进行中', '已结束'];
const stageList = ['所有人', '仅入党申请人', '仅推优对象', '仅积极分子', '仅发展对象', '仅预备党员', '仅正式党员', '仅党员/预备党员', '仅非党员'];

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    console.log(window.location.href.split('=')[1]);
    this.state = {
      activity_id: window.location.href.split('=')[1],
      activity_data: {
        title: '',
        content: '',
        end_time: '',
        start_time: '',
        start_sign_time: '',
        end_sign_time: '',
        hours: '',
        state: '',
        stage: '',
        party_branch: '',
        comment: '',
        location: '',
        type: '',
        coordinate: '',
        need_vertify: '',
        max_people_number: '',
      },
    };
    this.loadData();
  }

  openCoordinatePage = () => {
    // this.setState({
    //   modalOpen: true,
    // });
    window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html', 'target');
  };

  loadData = () => {
    var t = this;
    axios.get('https://igulu.net/api/activity/get/'.concat(this.state.activity_id), {
      withCredentials: true,
    })
      .then(function (res) {
        console.log('emm', res.data);
        var data = res.data;
        if (data.comment === 'null') {
          data.comment = '';
        }
        t.setState({
          activity_data: data,
        });
        console.log(t.state.activity_data);
      });
  };

  formChange = (value) => {
    console.log('value', value);
    let data = this.state.activity_data;
    // for (const key in value) {
    //   if (key === 'cats') {
    //     data.type = value.cats;
    //   } else if (key === 'time') {
    if (value.time) {
      data.start_time = value.time[0];
      data.end_time = value.time[1];
    }
    if (value.register_time) {
      data.start_sign_time = value.register_time[0];
      data.end_sign_time = value.register_time[1];
    }
    // //   } else if (key === 'register_time') {
    // data.start_sign_time = value.register_time[0];
    // data.end_sign_time = value.register_time[1];
    //   } else if (key === 'text') {
    //     data.content = value.text;
    //   }
    //   else {
    //     data[key] = value[key];
    //   }
    // }
    // console.log(data);
    this.setState({
      activity_data: data,
    });
  };

  handleSubmit = () => {
    var t = this;
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      const data = values;
      const bodyFormData = new FormData();
      bodyFormData.set('id', data.id);
      bodyFormData.set('title', data.title);
      bodyFormData.set('type', data.type);
      bodyFormData.set('hours', data.hours);
      bodyFormData.set('content', data.content);
      bodyFormData.set('stage', data.stage);
      bodyFormData.set('state', data.state);
      bodyFormData.set('party_branch', data.party_branch);
      bodyFormData.set('location', data.location);
      bodyFormData.set('start_time', data.start_time);
      bodyFormData.set('end_time', data.end_time);
      bodyFormData.set('start_sign_time', data.start_sign_time);
      bodyFormData.set('end_sign_time', data.end_sign_time);
      bodyFormData.set('coordinate', data.coordinate);
      bodyFormData.set('max_people_number', data.max_people_number);
      bodyFormData.set('comment', data.comment);
      // // console.log(bodyFormData);
      // console.log(bodyFormData);
      axios({
        method: 'POST',
        url: 'https://igulu.net/api/updateActivity',
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(function (response) {
          console.log('succ', response);
          if (response.data.code === 200) {
            window.location.href = 'http://jyxf.igulu.net/#/activity/activitylist';
            Feedback.toast.success('修改成功');
            return true;
          } else {
            Feedback.toast.error('修改失败');
            return false;
          }
        })
        .catch(function (error) {
          console.log('err', error);
          Feedback.toast.error('修改失败');
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
          value={this.state.activity_data}
          onChange={this.formChange}
        >
          <IceContainer title="编辑活动">
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题">
                    <IceFormBinder name="title">
                      <Input placeholder="填写文章标题" defaultValue={this.state.activity_data.title}/>
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
                  <FormItem label="活动地点">
                    <IceFormBinder
                      name="location"
                    >
                      <Input placeholder="填写活动地点名称" defaultValue={this.state.activity_data.location}/>
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
                  </FormItem>
                </Col>
                <Col span="2" offset="1">
                  <FormItem label="获取坐标">
                    <Button onClick={this.openCoordinatePage}>获取</Button>
                  </FormItem>
                </Col>
                <Col span="5" offset="2">
                  <FormItem label="活动类型">
                    <IceFormBinder
                      name="type"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择活动类型"
                        defaultValue={this.state.activity_data.type}
                        dataSource={[
                          { label: '组织生活', value: '1' },
                          { label: '理论学习', value: '2' },
                          { label: '实践学习', value: '3' },
                          { label: '其他活动', value: '4' },
                          { label: '专题培训', value: '5' },
                        ]}
                      />
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="活动学时" required>
                    <IceFormBinder
                      name="hours"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择活动学时"
                        defaultValue={this.state.activity_data.hours}
                        dataSource={[
                          { label: '0 学时', value: '0' },
                          { label: '1 学时', value: '1' },
                          { label: '2 学时', value: '2' },
                          { label: '3 学时', value: '3' },
                          { label: '4 学时', value: '4' },
                        ]}
                      />
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col span="6" offset="2">
                  <FormItem label="党支部限制">
                    <IceFormBinder
                      name="party_branch"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择党支部限制"
                        defaultValue={this.state.activity_data.party_branch}
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
                  </FormItem>
                </Col>
                <Col span="6" offset="2">
                  <FormItem label="发展阶段限制">
                    <IceFormBinder
                      name="stage"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择发展阶段限制"
                        defaultValue={this.state.activity_data.stage}
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
                      <RangePicker showTime
                                   value={[this.state.activity_data.start_time, this.state.activity_data.end_time]}/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col span="8" offset="1">
                  <FormItem label="报名起止时间">
                    <IceFormBinder
                      name="register_time"
                      type="array"
                      // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                      valueFormatter={(date, dateStr) => dateStr}
                    >
                      <RangePicker showTime
                                   value={[this.state.activity_data.start_sign_time, this.state.activity_data.end_sign_time]}/>
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
                      <Input placeholder="填写人数上限" defaultValue={this.state.activity_data.max_people_number}/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col>
                  <FormItem label="内容">
                    <IceFormBinder name="content">
                      <Input multiple placeholder="请填写活动内容" defaultValue={this.state.activity_data.content}/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="11">
                  <FormItem label="备注">
                    <IceFormBinder name="comment">
                      <Input multiple placeholder="请填写活动备注" defaultValue={this.state.activity_data.comment}/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>

              <IceLabel
                status={(this.state.activity_data.need_vertify !== 2) ? 'danger' : 'success'}>{(this.state.activity_data.need_vertify !== 2) ? ((this.state.activity_data.need_vertify === 1) ? '未审核' : '未通过') : '已通过'}</IceLabel>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  编辑完成
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
};
