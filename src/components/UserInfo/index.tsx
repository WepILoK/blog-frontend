import React from 'react';
import styles from './UserInfo.module.scss';
import {TypeUserInfo} from "./UserInfo.types";

export const UserInfo: React.FC<TypeUserInfo> = ({ avatarUrl, fullName, additionalText }) => {
    return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || require('../../assets/images/noavatar.png')} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
