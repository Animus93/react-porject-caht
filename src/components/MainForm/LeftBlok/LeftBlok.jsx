import { useGetUsersQuery } from 'redux/usersApiMockapi';
import styles from './LeftBlok.module.css';

const LeftBlok = () => {
  const { data: users } = useGetUsersQuery();


  return (
    <>
    {users && users.map(users => {
      return (<div key={users.user.email} className={styles.content}>
        <div className={styles.each}>
      <span className={users.isOnline ? styles.offline : styles.online}>
        {' '}
      </span>
      <b>{users.user.name}</b>
        </div>
      </div>)
    })}
    </>
  );
};
export default LeftBlok;
