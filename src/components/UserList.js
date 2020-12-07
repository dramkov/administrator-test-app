import React from 'react';
import User from './User';

const UserList = ({ userList, onDelete, onEdit }) => {
  const deleteHandler = (id) => {
    onDelete(id);
  };

  const editHandler = (id) => {
    onEdit(id);
  };

  return (
    <div className='table__container'>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Пароль</th>
            <th>Телефон</th>
            <th>ФИО</th>
            <th>Статус Пользователя</th>
            <th>Дата создания</th>
            <th>Дата последнего изменения</th>
            <th>Опции</th>
          </tr>
        </thead>
        {userList.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              onDelete={deleteHandler}
              onEdit={editHandler}
            />
          );
        })}
      </table>
    </div>
  );
};

export default UserList;
