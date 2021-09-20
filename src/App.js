import Customer from './components/Customer'
import './App.css';

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any',
    'name': '홍길동',
    'birthday': '210920',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': '기일동',
    'birthday': '980214',
    'gender': '여자',
    'job': '프로그래머'
  },
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/3',
    'name': '호옹길',
    'birthday': '951212',
    'gender': '남자',
    'job': '디자이너'
  }
  
]

function App() {
  return (
    <div>
      {
        customers.map(c => { // c로 순회
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
        })
      }
    </div>
  );
}

export default App;
