import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import { Feedback } from '@icedesign/base/index';
import './ArticleList.scss';
import axios from 'axios';

axios.defaults.withCredentials = true;

const statusList = ['已报名', '', '已报名', '已签到', '已提交心得', '审核通过', '未通过'];
const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部', '研究生第十三党支部', '研究生第十四党支部', '研究生第十五党支部', '研究生第十六党支部', '研究生第十七党支部'];

export default class ArticleList extends Component {
  static displayName = 'ArticleList';

  constructor(props) {
    super(props);
    this.state = { activity_id: window.location.href.split('=')[1], tableData: [] };
    this.loadData();
  }

  loadData = () => {
    const fmdata = new FormData();
    fmdata.set('id', this.state.activity_id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/getExperienceByActivityId',
      data: fmdata,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tableData: Array.from(res.data)
            .map((item, index) => {
              return {
                experience_title: item.experience_title ? item.experience_title : '心得未提交',
                experience: item.experience ? item.experience : '心得未提交',
                sign_time: item.sign_time,
                state: statusList[item.state],
                student_id: item.student_id,
                id: item.id,
                register_time: item.register_time,
                name: item.name,
                party_branch_id: item.party_branch_id,
              };
            }),
        });
        console.log('load', this.state.tableData);
        console.log('res', res.data);
      });
  };

  agree = (id) => {
    console.log(id);
    const bodyFormData = new FormData();
    bodyFormData.set('id', id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/passExperience',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        Feedback.toast.success('通过～');
        location.reload();
      });
  };

  disagree = (id) => {
    console.log(id);
    const bodyFormData = new FormData();
    bodyFormData.set('id', id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/denyExperience',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(function (response) {
        Feedback.toast.success('没通过～');
        location.reload();
      });
  };

  handleTagClick = () => {
    // handler
  };

  renderTag = (text, onClick) => {
    return (
      <Button size="small" onClick={onClick} key={text} style={styles.button}>
        {text}
      </Button>
    );
  };

  renderItem = (data, idx) => {
    const { isMobile } = this.props;
    const wrapperStyle = { ...styles.item };
    const informationStyle = { ...styles.information };
    console.log(data);
    return (
      <div key={idx} style={wrapperStyle}>
        <div style={styles.title}>
          {data.experience_title}
          {!isMobile && <span
            style={styles.datetime}>签到时间：{data.sign_time ? data.sign_time : '未签到'} 报名时间：{data.register_time ? data.register_time : '未签到'}</span>}
        </div>
        <div style={styles.desc}>{data.experience}</div>
        <div style={informationStyle}>

          <Button size="small" disabled={data.state === '审核通过' || data.experience === '心得未提交'} onClick={this.agree.bind(this, data.id)} type="primary">
            通过（点此即给予学时认定）
          </Button>
          {/*<Button size="small" onClick={this.disagree.bind(this, data.id)}>*/}
          {/*不通过*/}
          {/*</Button>*/}

          {!isMobile && (
            <div style={styles.operator}>
              <span style={styles.operatorItem}>状态: {data.state}</span>
              <span style={styles.operatorItem}>姓名: {data.name}</span>
              <span style={styles.operatorItem}>学号: {data.student_id}</span>
              <span style={styles.operatorItem}>党支部: {branchList[data.party_branch_id]}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const dataSource = this.state.tableData;
    return (
      <IceContainer className="article-list">
        {dataSource.map(this.renderItem)}
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    borderBottom: '1px solid #F4F4F4',
    marginBottom: '15px',
  },
  title: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '15px',
    position: 'relative',
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    fontSize: '12px',
    color: '#9B9B9B',
  },
  desc: {
    color: '#999',
    fontSize: '13px',
    lineHeight: '24px',
    paddingBottom: '15px',
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  button: {
    marginRight: '10px',
  },
  operator: {
    paddingTop: '8px',
    fontSize: '12px',
    color: '#9B9B9B',
  },
  operatorItem: {
    marginRight: '5px',
  },
  paginationWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
};
