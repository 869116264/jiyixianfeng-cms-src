import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Grid } from '@icedesign/base';
import axios from 'axios';

const { Row, Col } = Grid;

/**
 * 渲染详情信息的数据
 */

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: window.location.href.split('=')[1],
      data: {
        signNumber: 0,
        checkNumber: 0,
        experienceNumber: 0,
      },
    };
    console.log(this.state.id)
    this.loadData();
  }

  loadData = () => {
    var t = this;
    const bodyFormData = new FormData();
    bodyFormData.set('id', this.state.id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/getActivityDetail',
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

  experienceList = () => {
    window.location.href = 'http://jyxf.igulu.net/#/activity/experienceList?id='.concat(this.state.id);
  }

  render() {
    return (
      <IceContainer>
        <h2 style={styles.basicDetailTitle}>总结栏</h2>

        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>总结栏</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>报名人数：</span>
              <span style={styles.infoItemValue}>{this.state.data.signNumber}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>签到人数：</span>
              <span style={styles.infoItemValue}>{this.state.data.checkNumber}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>提交心得人数：</span>
              <span style={styles.infoItemValue}>{this.state.data.experienceNumber}</span>
            </Col>
          </Row>
          <Row>
            <Button onClick={this.experienceList.bind(this)} shape="text">
              心得列表
            </Button>
          </Row>
        </div>
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
