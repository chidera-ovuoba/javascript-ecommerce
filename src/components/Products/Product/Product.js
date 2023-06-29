import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
const Product = ({ product,handleAddCart }) => {
  
  const convertStringToHTML =(str)=> {
   let parser = new DOMParser();
   let doc = parser.parseFromString(str, 'text/html');
    // console.log(doc.body.firstChild)
    return doc.body.firstChild.innerHTML; 
  };
  const classes = useStyles();
  return (
    <Card className ={classes.root}>
      <CardMedia image={product.image.url} className={classes.media} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom >
          {product.name}
          </Typography>
          <Typography variant='h5' >
          {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography variant='body2' color='secondary'>{convertStringToHTML(product.description)}</Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label='Add to Cart' onClick={()=>handleAddCart(product.id,1)}>
          <AddShoppingCart/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product