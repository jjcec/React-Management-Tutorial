import React from 'react';
import { post } from 'axios'; // post 방식으로 고객 추가 데이터를 서버로 보낼 수 있도록
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// theme 정해주기
const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = { // state 변수값 초기화
            file: null, // 프로필 이미지
            userName: '',
            birthday : '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 현재 dialog 창이 열려 있는지
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault() // data가 서버로 전달됨에 있어서 오류가 발생하지 않도록 하나의 함수를 불러와 줌
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); // 비동기적 통신이라 여기에 위치
            })
        // this.setState({
        //     file: null,
        //     userName: '',
        //     birthday : '',
        //     gender: '',
        //     job: '',
        //     fileName: '',
        // })
        // window.location.reload();
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); // 현재 state값 갱신
    }
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        // 파일이 포함되어있는 어떤 데이터를 서버로 전달하고자 할 때는 웹 표준에 맞는 header를 추가해줘야한다.
        const config = {
        headers: {
            'content-type' : 'multipart/form-data' // 전달하고자 하는 data에 file이 포함되어있는 경우
        }
        } 
        return post(url, formData, config);
    }

    // 모달 열기 = () => 자동 바인딩 해주기
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // 모달 닫기
    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday : '',
            gebder: '',
            job: '',
            fileName: '',
            open: false,
        })  
    }
    
    render() {
        // 디자인 클래스를 입히기 위해서 클래스 변수 초기화
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd); //외부 라이브러리에서 출력할 수 있도록