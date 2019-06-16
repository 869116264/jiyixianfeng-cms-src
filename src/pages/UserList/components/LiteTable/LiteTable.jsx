import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Input, Select, Grid, Form, Feedback } from '@icedesign/base';
import axios from 'axios';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const FormItem = Form.Item;

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
  incomplete: {
    color: '#123123',
  },
};

const branchList = ['所有人', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部', '研究生第十三党支部', '研究生第十四党支部', '研究生第十五党支部', '研究生第十六党支部', '研究生第十七党支部'];

const generatorMockStatus = (b, i) => {
  if (b === 2) {
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
  } else if (b === 4) {
    return 'incomplete';
  } else {
    return 'none';
  }
};

const generatorData = () => {
  return Array.from({ length: 10 })
    .map((item, index) => {
      return {
        name: `姓名 ${index}`,
        number: `学号 ${index}`,
        phone: `手机号 ${index}`,
        now_stage: generatorMockStatus(),
      };
    });
};

const statusComponents = {
  stage1: <span style={styles.stage1}>提交申请书</span>,
  stage2: <span style={styles.stage2}>推优</span>,
  stage3: <span style={styles.stage3}>积极分子</span>,
  stage4: <span style={styles.stage4}>发展对象</span>,
  stage5: <span style={styles.stage5}>预备党员</span>,
  stage6: <span style={styles.stage6}>党员</span>,
  none: <span style={styles.none}>未选择发展阶段</span>,
  incomplete: <span style={styles.incomplete}>未完善信息</span>,
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { tableData: [], next_page_url: null, filter: { party_id: 0 } };
    this.loadData();
  }

  loadMoreData = () => {
    axios.get('https://igulu.net/api/'.concat(this.state.next_page_url), {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        const newData = res.data.data;
        console.log(res.data.next_page_url);
        this.setState({ next_page_url: res.data.next_page_url });
        const newTableData = this.state.tableData;
        console.log(newTableData);
        newTableData.push(...Array.from(res.data.data)
          .map((item, index) => {
            return {
              name: item.name,
              number: item.number,
              phone: item.phone,
              party_branch: branchList[item.party_branch_id],
              now_stage: generatorMockStatus(item.need_vertify, item.now_stage),
            };
          }));
        console.log(newTableData);
        this.setState({
          tableData: newTableData,
        });
        console.log('load', this.state.tableData);
        console.log('res', res.data);
      });
  };

  loadData = () => {
    axios.get('https://igulu.net/api/getStudentList', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        const newData = res.data.data;
        console.log(res.data.next_page_url);
        this.setState({ next_page_url: res.data.next_page_url });
        const newTableData = this.state.tableData;
        console.log(newTableData);
        newTableData.push(...Array.from(res.data.data)
          .map((item, index) => {
            return {
              name: item.name,
              number: item.number,
              phone: item.phone,
              party_branch: branchList[item.party_branch_id],
              now_stage: generatorMockStatus(item.need_vertify, item.now_stage),
            };
          }));
        console.log(newTableData);
        this.setState({
          tableData: newTableData,
        });
        this.setState({ next_page_url: res.data.next_page_url });
      });
    console.log('load', this.state.tableData);
  };

  renderStatus = (value) => {
    return statusComponents[value];
  };

  formChange = (value) => {
    this.setState({
      filter: value,
    });
    console.log(this.state);
  };

  getStudentListByPartyId = () => {
    const bodyFormData = new FormData();
    bodyFormData.set('party_id', this.state.filter.party_id);
    axios({
      method: 'POST',
      url: 'https://igulu.net/api/getStudentListByPartyId',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((res) => {
        console.log(res);
        this.setState({ next_page_url: res.data.next_page_url });
        const newTableData = [];
        newTableData.push(...Array.from(res.data.data)
          .map((item, index) => {
            return {
              name: item.name,
              number: item.number,
              phone: item.phone,
              party_branch: branchList[item.party_branch_id],
              now_stage: generatorMockStatus(item.need_vertify, item.now_stage),
            };
          }));
        console.log(newTableData);
        this.setState({
          tableData: newTableData,
        });
        this.setState({ next_page_url: res.data.next_page_url });
      });
  };

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="姓名" dataIndex="name" width={100}/>
            <Table.Column title="学号" dataIndex="number" width={100}/>
            <Table.Column title="手机号" dataIndex="phone" width={100}/>
            <Table.Column title="党支部" dataIndex="party_branch" width={100}/>
            <Table.Column
              title="发展阶段"
              dataIndex="now_stage"
              cell={this.renderStatus}
              width={100}
            />
          </Table>
        </IceContainer>
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={this.state.filter}
          onChange={this.formChange}
        >
          <div>


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
              <Button type="primary" onClick={this.getStudentListByPartyId}>
                筛选
              </Button>
            </FormItem>
          </div>
        </IceFormBinderWrapper>
        <Button onClick={this.loadMoreData} disabled={this.state.next_page_url === null} type="primary">
          加载更多
        </Button>

      </div>
    );
  }
}
