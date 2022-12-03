import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const submit = (e) => {
    e.preventDefault();

    if (canSave) {
      dispatch(addNewPost({ title, body: content, userId })).unwrap();
      setTitle('');
      setContent('');
      setUserId('');
    }

    try {
    } catch (error) {
      console.error('Failed to save the post', error);
    } finally {
      setAddRequestStatus('idle');
    }
  };

  const renderUsersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h3>Add a new post</h3>
      <form onSubmit={submit}>
        <label>Title</label>
        <input value={title} onChange={onTitleChanged} type='text' />
        <label>Content</label>
        <input value={content} onChange={onContentChanged} type='text' />
        <label>Author</label>
        <select value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {renderUsersOptions}
        </select>
        <button disabled={!canSave} type='submit'>
          Save
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
