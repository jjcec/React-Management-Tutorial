import React, { Component } from 'react'; // function일 때는 없었지만 Class를 쓴다면 추가
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper'; // 컴포넌트의 외부를 감싸기 위해 사용하는 컴포넌트 중 하나
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit*3, // 여백 3
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit*2
  }
})

class App extends Component { // theme 적용하기 위해 class로 바꿈
  
  state = {
    customers: "",
    completed: 0 // 진행 속도 퍼센트지 나타내줄려고
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 0.02초마다 progress 함수 실행
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = () => { // 진행속도 나타내주는 이미지
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed+1});
  }
  render() { // Class로 바꾸면 render함수로 감싸야한다.
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.customers ? this.state.customers.map(c => { // c로 순회, 한줄로도 작성 가능
                return (
                  <Customer
                    key={c.id} // map을 사용할 때 key값을 넣어줘야한다.
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              }) :
                // 프로그래스바 설정
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} varient="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
