import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@icedesign/base';

import axios from 'axios';

// axios.defaults.withCredentials = true;

const styles = {
  stage1: {
    color: '#66427c',
  },
  stage2: {
    color: '#5485F7',
  },
  stage3: {
    color: '#64D874',
  },
  stage4: {
    color: '#999999',
  },
  stage5: {
    color: '#fae37f',
  },
  stage6: {
    color: '#fd5849',
  },
  none: {
    color: '#000000',
  },
};

const generatorMockStatus = (i) => {
  if (i === 1) {
    return 'stage1';
  } else if (i === 2) {
    return 'stage2';
  } else if (i === 3) {
    return 'stage3';
  } else if (i === 4) {
    return 'stage4';
  } else if (i === 5) {
    return 'stage5';
  } else if (i === 6) {
    return 'stage6';
  } else {
    return 'none';
  }
};

const statusComponents = {
  stage1: <span style={styles.stage1}>提交申请书</span>,
  stage2: <span style={styles.stage2}>推优</span>,
  stage3: <span style={styles.stage3}>积极分子</span>,
  stage4: <span style={styles.stage4}>发展对象</span>,
  stage5: <span style={styles.stage5}>预备党员</span>,
  stage6: <span style={styles.stage6}>党员</span>,
  none: <span style={styles.none}>未审核</span>,
};

const generatorData = (data) => {
  return Array.from(data)
    .map((item, index) => {
      return {
        type: (item.need_vertify === 2) ? '晋升' : '完善信息',
        name: item.name,
        number: item.number,
        status: (item.need_vertify === 1) ? '需要审核' : '未通过',
        now_stage: statusComponents[generatorMockStatus(item.now_stage)],
      };
    });
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};


  constructor(props) {
    super(props);
    this.state = { tableData: [] };
    this.loadData();
  }

  loadData = () => {
    axios.get('https://igulu.net/api/getNeedUpStudent/', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tableData: generatorData(res.data.data),
        });
      });
  };

  renderStatus = (value) => {
    return statusComponents[value];
  };

  agree = (index) => {
    console.log(index, 'agree');
    const bodyFormData = new FormData();
    bodyFormData.set('number', this.state.tableData[index].number);
    console.log(this.state.tableData[index].number);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/passLevelUp',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .catch(function (err) {
        window.location.reload();
      });
  };

  renderAgree = (value, index) => {
    return (
      <Button onClick={this.agree.bind(this, index)} disabled={this.state.tableData[index].status === '未通过'}
              type="primary">
        通过
      </Button>
    );
  };

  disagree = (index) => {
    console.log(index, 'disagree');
    const bodyFormData = new FormData();
    bodyFormData.set('number', this.state.tableData[index].number);
    console.log(this.state.tableData[index].number);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/denyLevelUp',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .catch(function (err) {
        window.location.reload();
      });
  };

  renderDisagree = (value, index) => {
    return (
      <Button onClick={this.disagree.bind(this, index)} disabled={this.state.tableData[index].status === '未通过'}
              style={styleDis.disagree} type="danger">
        不通过
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="姓名" dataIndex="name" width={50}/>
            <Table.Column title="学号" dataIndex="number" width={50}/>
            <Table.Column title="发展阶段" dataIndex="now_stage" width={70}/>
            <Table.Column title="审核类型" dataIndex="type" width={50}/>
            <Table.Column title="审核情况" dataIndex="status" width={50}/>
            <Table.Column title="通过" width={65} cell={(this.renderAgree)}/>
            <Table.Column title="不通过" width={65} cell={(this.renderDisagree)}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styleDis = {
  disagree: {
    color: '#FA7070',
  },
};
