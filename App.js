
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Text, Button, Icon, Content, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = { semuaData: [], search: "" }
  }

  get = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

    var config = {
      headers: { 'user-key': '58effe58d39549bf65942c0be39a2c89' }
    };

    axios.get(url, config)
      .then((ambilData) => {
        this.setState({ semuaData: ambilData.data.restaurants })
      })
  }

  render() {

    const data = this.state.semuaData.map((x, index) => {
      var namaRestaurant = x.restaurant.name;
      var kotaRestaurant = x.restaurant.location.city;
      var alamatRestaurant = x.restaurant.location.address;
      var hargaRestaurant = (x.restaurant.average_cost_for_two / 2);
      var gambarRestaurant = x.restaurant.thumb;
      return (
        <Container style={{ backgroundColor: "pink" }}>

          <Card key={index} style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: gambarRestaurant }} />
                <Body>
                  <Text>{namaRestaurant}</Text>
                  <Text note>{kotaRestaurant}</Text>
                </Body>
              </Left>
              <Right>
                <Text>{hargaRestaurant}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Body>
                <Image source={{ uri: gambarRestaurant }} style={{ height: 200, width: 350, flex: 0 }} />
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon name="thumbs-up" />
                <Text>{alamatRestaurant}</Text>
              </Left>
            </CardItem>
          </Card>

        </Container>
      )
    })

    return (
      <Container style={{ backgroundColor: 'pink' }}>
        <Header searchBar rounded style={{ backgroundColor: 'red' }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari nama makanan" onChangeText={(x) => { this.setState({ search: x }) }} value={this.state.form} />
          </Item>
        </Header>

        <Header style={{ backgroundColor: "pink" }}>
          <Button style={{ backgroundColor: "red" }}
            block onPress={() => { this.get() }}>
            <Text> LIHAT DAFTAR RESTO </Text>
          </Button>
        </Header>

        <Content>
          {data}
        </Content>
      </Container >
    )
  }
}

export default App;


