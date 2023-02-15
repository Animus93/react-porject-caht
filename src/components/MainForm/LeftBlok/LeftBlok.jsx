import { useGetUsersQuery } from 'redux/usersApiMockapi';
import styles from './LeftBlok.module.css';

const LeftBlok = (props) => {
  const { data: users } = useGetUsersQuery();


  return (
    <>
        <button 
        className={styles.closeBtn}
        onClick ={()=> props.showLeftBlok()}
        ></button>
            <p>
            <b className={styles.title}>Пользователи онлайн</b>
          </p>
    {users && users.map(users => {
      return (<div key={users.user.email} className={styles.content}>
        <div className={styles.each}>
      <b className={!users.isOnline ? styles.offline : styles.online}>{users.user.name}</b>
        </div>
      </div>)
    })}
    </>
  );
};
export default LeftBlok;
