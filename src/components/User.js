import React from 'react';

const User = ({ user, onDelete, onEdit }) => {
  const deleteHandler = (id) => {
    onDelete(id);
  };

  const editHandler = (id) => {
    onEdit(id);
  };

  return (
    <tbody>
      <tr>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.phone}</td>
        <td>{user.name}</td>
        <td>{user.status}</td>
        <td>{user.dateCreate}</td>
        <td>{user.dateUpdate}</td>
        <td className='buttons'>
          <button
            className='btn__small btn__small-del'
            onClick={() => deleteHandler(user.id)}
          >
            Delete
          </button>
          <button
            className='btn__small btn__small-ed'
            onClick={() => editHandler(user.id)}
          >
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default User;
