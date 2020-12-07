import React, { useEffect, useState } from 'react';
import moment from 'moment';

import '../styles/App.css';
import { User } from '../model/user';
import UserList from './UserList';

const now = moment().format('DD MM YYYY hh:mm:ss');

function App() {
  const initialUserList = () => JSON.parse(localStorage.getItem('db')) || [];

  const [userList, setUserList] = useState(initialUserList);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('client');
  const [dateCreate, setDateCreate] = useState('');
  const [dateUpdate, setDateUpdate] = useState('');
  const [id, setId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('db', JSON.stringify(userList));
  }, [userList]);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    switch (e.target.name) {
      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);
      case 'phone':
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
          return setPhone(value);
        } else {
          return;
        }
      case 'name':
        return setName(value);
      case 'status':
        return setStatus(value);

      default:
        return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const dublicateEmail = userList.filter((user) => {
      return user.email === email;
    });

    const isCorrectFIO = (fio) => {
      if (!fio) {
        return false;
      }

      let fioA = fio.split(' ');
      if (fioA.length !== 3) {
        return false;
      }
      for (let i = 0; i < 3; i++) {
        if (/[^-А-ЯA-Z\x27а-яa-z]/.test(fioA[i])) {
          return false;
        }
      }

      return true;
    };

    if (dublicateEmail.length > 0) {
      setError('Такой email уже существует');
    } else if (password.length <= 3) {
      setError('Пароль слишком короткий');
    } else if (phone.length < 9) {
      setError('В номере минимум 9 цифр');
    } else if (!isCorrectFIO(name)) {
      setError('Фамилия Имя Отчество');
    } else if (status.length === 0) {
      setError('Укажите статус');
    } else {
      setUserList(
        userList.concat(
          new User(
            new Date().toString(),
            email,
            password,
            phone,
            name,
            status,
            now,
            ''
          )
        )
      );
      setError('');
      setEmail('');
      setPassword('');
      setPhone('');
      setName('');
      setStatus('client');
    }
  };

  const onEditSubmit = (e) => {
    e.preventDefault();

    const isCorrectFIO = (fio) => {
      if (!fio) {
        return false;
      }

      let fioA = fio.split(' ');
      if (fioA.length !== 3) {
        return false;
      }
      for (let i = 0; i < 3; i++) {
        if (/[^-А-ЯA-Z\x27а-яa-z]/.test(fioA[i])) {
          return false;
        }
      }

      return true;
    };

    if (password.length <= 3) {
      setError('Пароль слишком короткий');
    } else if (phone.length < 9) {
      setError('В номере минимум 9 цифр');
    } else if (!isCorrectFIO(name)) {
      setError('Фамилия Имя Отчество');
    } else if (status.length === 0) {
      setError('Укажите статус');
    } else {
      const newUser = new User(
        id,
        email,
        password,
        phone,
        name,
        status,
        dateCreate,
        now
      );

      const newUserList = userList.map((user) => {
        if (user.id === newUser.id) {
          return {
            ...user,
            ...newUser,
          };
        } else {
          return user;
        }
      });

      setUserList(newUserList);
      setError('');
      setEmail('');
      setPassword('');
      setPhone('');
      setName('');
      setStatus('client');
      setDateUpdate('');
      setDateCreate('');
      setIsEdit(false);
    }
  };

  const onDelete = (id) => {
    const newUserList = userList.filter((user) => {
      return id !== user.id;
    });
    setUserList(newUserList);
  };

  const onEdit = (id) => {
    const editedUser = userList.filter((user) => {
      return id === user.id;
    });
    setEmail(editedUser[0].email);
    setPassword(editedUser[0].password);
    setPhone(editedUser[0].phone);
    setName(editedUser[0].name);
    setStatus(editedUser[0].status);
    setDateCreate(editedUser[0].dateCreate);
    setDateUpdate(editedUser[0].dateUpdate);
    setId(editedUser[0].id);
    setIsEdit(true);
  };

  const sorteredList = userList.filter((user) => {
    return user.status === filter;
  });

  let filteredList;
  if (filter.length === 0) {
    filteredList = userList.filter((user) => {
      return (
        user.email
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()) ||
        user.phone.includes(+searchInput)
      );
    });
  } else {
    filteredList = sorteredList.filter((user) => {
      return (
        user.email
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()) ||
        user.phone.includes(+searchInput)
      );
    });
  }

  return (
    <div id='home__page'>
      <header className='header'>
        <h1>Административное управление пользователями</h1>
      </header>
      <main className='main'>
        <div className='main__tools'>
          <div className='main__tools-adder'>
            <form onSubmit={isEdit ? onEditSubmit : onSubmit}>
              {error && (
                <div className='error'>
                  <p className='error__text'>{error}</p>
                </div>
              )}
              <input
                required
                placeholder='Введите email'
                type='email'
                name='email'
                autoFocus
                value={email}
                onChange={onChangeHandler}
              />
              <input
                required
                placeholder='Введите пароль'
                type='password'
                name='password'
                value={password}
                onChange={onChangeHandler}
              />
              <input
                required
                placeholder='Введите номер телефона'
                type='text'
                name='phone'
                value={phone}
                onChange={onChangeHandler}
              />
              <input
                required
                placeholder='Введите ФИО'
                type='text'
                name='name'
                value={name}
                onChange={onChangeHandler}
              />
              <select
                name='status'
                onChange={onChangeHandler}
                value={status}
                required
              >
                <option value='client'>Client</option>
                <option value='partner'>Partner</option>
                <option value='admin'>Admin</option>
              </select>

              {isEdit ? (
                <button className='btn btn-edit' onSubmit={onEditSubmit}>
                  Редактировать пользователя
                </button>
              ) : (
                <button className='btn btn-add' onSubmit={onSubmit}>
                  Добавить Пользователя
                </button>
              )}
            </form>
          </div>

          <div className='main__tools-sorter'>
            <input
              placeholder='Поиск'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              name='filter'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value=''>Без фильтра</option>
              <option value='client'>Clients</option>
              <option value='partner'>Partners</option>
              <option value='admin'>Admins</option>
            </select>
          </div>
        </div>

        <div className='main__list'>
          <UserList
            userList={filteredList}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </main>
      <footer className='footer'>
        <p>Made by Alexander Dramkov for a test app</p>
      </footer>
    </div>
  );
}

export default App;
