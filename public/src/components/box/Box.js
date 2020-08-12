import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../container/Container';
import Input from '../input/Input';
import Button from '../button/Button';
import Title from '../title/Title';

import style from '../../css/inline';

const Box = ({ link, title, text, inputs, button, to }) => (
  <section style={style.boxform}>
    <ul style={style.box}>
      {!!link && (
        <div style={style.containterLink}>
          {/* card link */}
          {link.map((item, i) => {
            if (item.to) {
              return (
                <Link key={i} style={style.editLink} to={item.to}>
                  {item.text}
                </Link>
              );
            } else {
              return (
                <a key={i} style={style.editLink} onClick={item.action}>
                  {item.text}
                </a>
              );
            }
          })}
        </div>
      )}
      {!!title && (
        <Container>
          <Title title={title} />
        </Container>
      )}
      {!!text && (
        <Container>
          <p>{text}</p>
        </Container>
      )}
      {!!inputs &&
        inputs.map((input, i) => {
          return (
            <Container key={i}>
              <Input
                type={input.type}
                id={input.id}
                text={input.text}
                inputRef={input.inputRef}
                label={input.label}
                disabled={input.disabled}
                defaultValue={input.defaultValue}
              />
            </Container>
          );
        })}
      {!!button && (
        <Container>
          {(!!to && (
            <Link to={to}>
              <Button name={button} />
            </Link>
          )) || <Button name={button} />}
        </Container>
      )}
    </ul>
  </section>
);

export default Box;
