import * as React from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Template from '../Template';
import OrderForm from './OrderForm';
import Card from '../common/Card';
import CardContent from '../common/CardContent';
import Loading from '../common/Loading';
import CardTitle from '../common/CardTitle';

import { colors } from '../../theme';

const Text = styled.span`
  color: ${colors.text};
`;

class OrderIssueList extends React.Component {
  state = {
    isLoading: true,
    issues: [],
  };

  componentDidMount() {
    const { setFieldValue, match } = this.props;
    const { id } = match.params;

    fetch(`http://localhost:5000/issues/${id}`)
    .then(response => response.json())
    .then(({ data }) => {
      this.setState({ isLoading: false, issues: data })
    })
    .catch(error => {
      this.setState({ isLoading: false });
      alert('Error while trying to fetch');
      console.error(error);
    });

  }

  renderIssueList = (issues) => {
    return (
      issues && issues.length > 0 &&
      <Card title='Issues'>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Issue Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map(({ issueKey, orderId }) => {
                return (
                  <TableRow key={issueKey} hover onClick={() => window.open(`https://albelli-test-cc.atlassian.net/projects/CC/board?issue-key=${issueKey}`, '_blank')}>
                    <TableCell component="th" scope="row">
                      <Text>{orderId}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{issueKey}</Text>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  render() {
    const { isLoading, issues } = this.state;
    return (
      isLoading
      ? 
        <Loading />
      :
        this.renderIssueList(issues)
    );
  }
};

export default withRouter(OrderIssueList);
