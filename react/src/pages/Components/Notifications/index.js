import React, { useState } from 'react';

import { MdNotifications } from 'react-icons/md';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread>
        <MdNotifications size={35} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          <Notification unread>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Seu pedido em Café Palestra está pronto</p>
            <time>há 1 dia</time>
            <button type="button">Marcar como lida</button>
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
}
