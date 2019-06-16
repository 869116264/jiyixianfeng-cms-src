import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button } from '@icedesign/base';
import axios from 'axios';

const styles = {
  uninitiated: {
    color: '#5485F7',
  },
  registering: {
    color: '#64D874',
  },
  expired: {
    color: '#999999',
  },
  underway: {
    color: '#FA7070',
  },
  pause: {
    color: '#ffbe00',
  },
  ongoing: {
    color: '#333333',
  },
};

const activityType = ['未选择', '组织生活', '理论学习', '社会实践', '其他活动', '专题培训'];

const generatorMockStatus = (i) => {
  if (i === 1) {
    return 'uninitiated';
  } else if (i === 2) {
    return 'registering';
  } else if (i === 4) {
    return 'underway';
  } else if (i === 3) {
    return 'pause';
  } else if (i === 5) {
    return 'ongoing';
  } else if (i === 6) {
    return 'expired';
  }
};

const statusComponents = {
  uninitiated: <span style={styles.uninitiated}>活动内容准备中</span>,
  registering: <span style={styles.registering}>报名开始</span>,
  pause: <span style={styles.pause}>报名结束</span>,
  underway: <span style={styles.underway}>活动开展准备中</span>,
  expired: <span style={styles.expired}>已结束</span>,
  ongoing: <span style={styles.ongoing}>进行中</span>,
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { tableData: [] };
    console.log('begin', this.state);
    this.loadData();
  }


  loadData = () => {
    axios.get('https://igulu.net/api/administer/getAutonomousActivitys', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tableData: Array.from(res.data)
            .map((item, index) => {
              return {
                activity: item.name,
                activity_type: activityType[item.type],
                student: item.student_id,
                id: item.id,
              };
            }),
        });
        console.log('load', this.state.tableData);
        console.log('res', res.data);
      });
  };


  edit = (index) => {
    console.log(this.state.tableData[index].id, 'edit');
    window.location.href = 'http://jyxf.igulu.net/#/self/info?id='.concat(this.state.tableData[index].id);
  };

  renderEdit = (value, index) => {
    return (
      <Button onClick={this.edit.bind(this, index)} shape="text">
        查看
      </Button>
    );
  };

  renderStatus = (value) => {
    return statusComponents[value];
  };

  render() {
    const { tableData } = this.state;
    console.log('ahh', tableData);
    console.log(this.state.tableData);
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="活动名称" dataIndex="activity" width={200}/>
            <Table.Column title="活动类型" dataIndex="activity_type" width={100}/>
            <Table.Column title="学号" dataIndex="student" width={100}/>
            <Table.Column title="查看" width={50} cell={(this.renderEdit)}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}
