import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2024 Pharmacy System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #ccc',
  },
};

export default Footer;
