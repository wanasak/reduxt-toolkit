import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();
  const userRef = useRef();
  const users = useSelector(selectAllUsers);

  const submit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const userId = userRef.current.value;

    if (title && content) {
      dispatch(postAdded({ title, content, userId }));
      titleRef.current.value = '';
      contentRef.current.value = '';
      userRef.current.value = '';
    }
  };

  const renderUsersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a new post</h2>
      <form onSubmit={submit}>
        <label>Title</label>
        <input ref={titleRef} type='text' />
        <label>Content</label>
        <input ref={contentRef} type='text' />
        <label>Author</label>
        <select ref={userRef}>
          <option value=''></option>
          {renderUsersOptions}
        </select>
        <button type='submit'>Save</button>
      </form>
    </section>
  );
};

export default AddPostForm;
