import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardText,
  CardTitle,
  } from 'react-md';

const style = { /*maxWidth: 600*/ };

const Expandable = ({item}) => (
  <Card style={style} className="md-block-centered">
    <CardTitle
      expander
      title={item.name}
      subtitle={item.name}
      avatar={<Avatar src={item.image} role="presentation" />}
    >
      <Button className="md-cell--right" icon>star_outline</Button>
      </CardTitle>

    <CardText expandable>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci
        elit, sed eleifend nunc blandit auctor. Phasellus sodales vestibulum aliquet.
        Cras neque leo, congue eu risus non, lobortis sagittis dui. Curabitur auctor
        nibh at dignissim scelerisque. Duis urna risus, sodales vitae viverra vitae,
        placerat eu nulla. Nam eget ante congue enim interdum consectetur. In pharetra
        viverra tempor.
      </p>

    </CardText>
  </Card>
);
export default Expandable;
