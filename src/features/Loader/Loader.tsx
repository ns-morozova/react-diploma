import React from 'react';
import { Oval } from 'react-loader-spinner';

import styles from './Loader.module.css';

export const Loader: React.FC = () => {
    return (
      <div className={styles.loader}>
        <Oval
          height={40}
          width={40}
          color="#e0e1ed"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#3A4B69"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
};