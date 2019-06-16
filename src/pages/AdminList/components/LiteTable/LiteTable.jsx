import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@icedesign/base';
import axios from 'axios';

const styles = {
  processing: {
    color: '#5485F7',
  },
  finish: {
    color: '#64D874',
  },
  terminated: {
    color: '#999999',
  },
  pass: {
    color: '#FA7070',
  },
};

const generatorMockStatus = () => {
  const random = parseInt(Math.random() * 10, 10);
  if (random < 3) {
    return 'processing';
  } else if (random >= 3 && random < 6) {
    return 'finish';
  } else if (random >= 6 && random < 8) {
    return 'terminated';
  } else if (random >= 8) {
    return 'pass';
  }
};

const generatorData = (data) => {
  return Array.from(data)
    .map((item, index) => {
      return {
        name: item.name,
        number: item.number,
        password: item.password,
        party: branchList[item.party_id],
        level: item.level === 1 ? '支部书记' : '超级管理员',
      };
    });
};

const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部'];

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
    this.loadData();
  }

  loadData = () => {
    axios.get('https://igulu.net/api/getAllAdministerAndParty/', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tableData: generatorData(res.data),
        });
      });
  };

  renderStatus = (value) => {
    return branchList[value];
  };

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="管理员姓名" dataIndex="name" width={100}/>
            <Table.Column title="管理员账号" dataIndex="number" width={100}/>
            <Table.Column title="密码" dataIndex="password" width={100}/>
            <Table.Column
              title="党支部"
              dataIndex="party"
              width={200}
            />
            <Table.Column title="身份" dataIndex="level" width={100}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}
