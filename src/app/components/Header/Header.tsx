import React from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import logo from '../../../assets/logo.svg';

const formattedDate = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const upperCasedFormattedDate = `${formattedDate
  .charAt(0)
  .toUpperCase()}${formattedDate.slice(1)}`;

function Header() {
  return (
    <div id={styles.header}>
      <Image priority src={logo} alt="logo" />
      <h4 className={styles.greeting}>Bem vindo de volta, John Doe</h4>
      <h4 className={styles.date}>{upperCasedFormattedDate}</h4>
      <div className={styles.divider} />
    </div>
  );
}

export default Header;
