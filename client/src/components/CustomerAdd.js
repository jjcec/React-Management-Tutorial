import React from 'react';
import { post } from 'axios'; // post 방식으로 고객 추가 데이터를 서버로 보낼 수 있도록

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

  render() {
    return (
      // 고객추가 양식이 어떤식으로 보여질지 정의
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객추가</h1>
        프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
        <br/>
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/>
        <br/>
        생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/>
        <br/>
        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/>
        <br/>
        직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
        <br/>
        <button type="submit">추가하기</button>
        {/* 이걸 누르면 handleFormSubmit 함수가 자동으로 불러와진다. */}
      </form>
    )
  }
}

export default CustomerAdd; //외부 라이브러리에서 출력할 수 있도록