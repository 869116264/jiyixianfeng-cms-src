import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button } from '@icedesign/base';
import axios from 'axios';

const { Row, Col } = Grid;

/**
 * 渲染详情信息的数据
 */
const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部'];

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { info: {} };
    this.loadData();
  }

  loadData = () => {
    axios.get('https://igulu.net/api/administer/get', {
      withCredentials: true,
    })
      .then((res) => {
        this.setState({
          info: res.data,
        });
      });
  };

  verifyActivityList = () => {
    window.location.href = 'http://jyxf.igulu.net/#/admin/verifyactivitylist';
  };
  createAdmin = () => {
    window.location.href = 'http://jyxf.igulu.net/#/admin/createAdmin';
  };
  adminList = () => {
    window.location.href = 'http://jyxf.igulu.net/#/admin/adminlist';
  };

  render() {
    return (
      <IceContainer>
        <h2 style={styles.basicDetailTitle}>基础详情页</h2>

        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>基本信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>支部名称：</span>
              <span style={styles.infoItemValue}>{branchList[this.state.info.party_id]}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>管理员名称：</span>
              <span style={styles.infoItemValue}>{this.state.info.name}</span>
            </Col>
          </Row>
        </div>

        <Button onClick={this.verifyActivityList} type="primary" disabled={this.state.info.level !== 2}>
          活动审批
        </Button>
        <Button onClick={this.adminList} type="primary" disabled={this.state.info.level !== 2}>
          管理员列表
        </Button>
        <Button onClick={this.createAdmin} type="primary" disabled={this.state.info.level !== 2}>
          创建管理员
        </Button>

      </IceContainer>
    );
  }
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
