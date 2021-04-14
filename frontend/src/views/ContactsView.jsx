import React from 'react';
import View from './View.jsx';

const contacts = {
  email: 'office@bosanoga.ru',
  phone: '+7-495-790-35-03',
};

function ContactsView() {
  return (
    <View>
      <section className="top-sales">
        <h2 className="text-center">Контакты</h2>
        <p>Наш головной офис расположен в г.Москва, по адресу:
        Варшавское шоссе, д. 17, бизнес-центр W Plaza.</p>
        <h5 className="text-center">Координаты для связи:</h5>
        <p>Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a> (ежедневно: с 09-00 до 21-00)</p>
        <p>Email: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></p>
      </section>
    </View>
  );
}

export default ContactsView;
