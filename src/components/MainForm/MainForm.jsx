import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useUpdateMessagesMutation,
} from 'redux/chatApiMockapi';
import {
  useUpdateUsersMutation,
  useUserOfflineMutation,
} from 'redux/usersApiMockapi';
import LeftBlok from './LeftBlok/LeftBlok';
import styles from './MainForm.module.css';

const MainForm = () => {
  const [offline] = useUserOfflineMutation();
  const current = useSelector(state => state.user);
  const { data, isLoading } = useGetMessagesQuery();
  const [dataUpd] = useUpdateMessagesMutation();
  const [usersUpd] = useUpdateUsersMutation();
  const [newMessage] = useAddMessageMutation();
  const [active, setActive] = useState();

  useEffect(() => {
    window.screen.width > 900 ? setActive(true) : setActive(false);
    scrollDown();
    return;
  }, [data]);

  const scrollDown = () => {
    const list = document.querySelector('#messages');
    if (list.children[0].lastElementChild) {
      return list.children[0].lastElementChild.scrollIntoView();
    }
  };

  const sendMessage = async (e) => {
    scrollDown();
    if (e.key === 'Enter') {
      e.preventDefault();
      const messageText = e.currentTarget.textContent;
      e.currentTarget.textContent = '';
      const postDate = `${new Date()
        .toLocaleDateString()
        .slice(0, -5)} ${new Date().toLocaleTimeString().slice(0, -3)}`;
      const createNewMessage = {
        createdAt: postDate,
        name: current.user.name,
        text: messageText,
      };
    await newMessage(createNewMessage);

    }
  };
  const update = () => {
    dataUpd();
    usersUpd();
  };

  const showLeftBlok = () => {
    setActive(!active);
  };

  return (
    <div className={styles.content}>
      <div className={styles.user}>
        <b>{current.user.name}</b>
        <button onClick={() => offline(current.id)}>Logout</button>
      </div>
      {active && (
        <div className={!active ? styles.leftBlok : styles.open}>
          <LeftBlok showLeftBlok={showLeftBlok} />
        </div>
      )}
      <div id="messages" className={styles.rightBlok}>
        {isLoading ? (
          <p>Load chat messages</p>
        ) : (
          <div className={styles.caht}>
            {data.map(message => {
              return (
                <div
                  id="caht"
                  key={message.id}
                  className={
                    message.name === current.user.name
                      ? styles.myMessage
                      : styles.cahtMessage
                  }
                >
                  <p className={styles.name}>{message.name}</p>
                  <p className={styles.text}>{message.text}</p>
                  <p className={styles.createdAt}>{message.createdAt}</p>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.form}>
          <div
            className={styles.inp}
            data-placeholder="Message"
            contentEditable="true"
            onKeyDown={sendMessage}
          ></div>
          <button className={styles.users} onClick={showLeftBlok}></button>
        <button className={styles.refresh}onClick={update}></button>
        </div>
      </div>
    </div>
  );
};
export default MainForm;
