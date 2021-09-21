import React, { Component } from 'react'; // function일 때는 없었지만 Class를 쓴다면 추가
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper'; // 컴포넌트의 외부를 감싸기 위해 사용하는 컴포넌트 중 하나
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: "100%",
    minwidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit*2
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class App extends Component { // theme 적용하기 위해 class로 바꿈
  
  // state = {
  //   customers: "",
  //   completed: 0 // 진행 속도 퍼센트지 나타내줄려고
  // }

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: '' // 검색 문자열 초기화 -> 모든 고객 출력
    }
  }
  // state 초기화
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: '' // 검색어 초기화
    });
    // 고객목록을 새롭게 다시 불러와야 한다.
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err))
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
  // 필터함수에서 사용하기 위해서
  handleValueChange = (e) => {
    let nextState= {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() { // Class로 바꾸면 render함수로 감싸야한다.
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
		          value={this.state.searchKeyword}
		          onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          {/* 화면에 출력할 때 props값으로 stateRefresh를 설정. 함수 자체를 props 형태로 보내주는 것 */}
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ?
                  // this.state.customers.map(c => { // c로 순회, 한줄로도 작성 가능
                  // return (
                  //   <Customer stateRefresh={this.stateRefresh}
                  //     key={c.id} // map을 사용할 때 key값을 넣어줘야한다.
                  //     id={c.id}
                  //     image={c.image}
                  //     name={c.name}
                  //     birthday={c.birthday}
                  //     gender={c.gender}
                  //     job={c.job}
                  //   />
                  // )
                // })
                filteredComponents(this.state.customers):
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
        </div>
    );
  }
}

export default withStyles(styles)(App);
