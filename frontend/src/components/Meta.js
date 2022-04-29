import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta name="keyword" content={keywords} />
      </Helmet>
   );
};

Meta.defaultProps = {
   title: 'D-Day',
   description: 'We help you keep tracks of the birthday of people.',
   keywords: 'birthdays, birthday tracking app, tracking birthday',
};

export default Meta;
