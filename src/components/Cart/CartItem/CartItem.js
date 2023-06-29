import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
const CartItem = ({item,handleUpdateQty,removeItem}) => {
    const classes = useStyles();
  return (
      <Card>
          <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
          <CardContent className={classes.cardContent}>
              <Typography variant='h4'>{item.name}</Typography>
              <Typography variant='h5'>{item.price.formatted_with_symbol }</Typography>
          </CardContent>
          <CardActions className={classes.cartActions}>
              <div className={classes.buttons}>
                  <Button type="button" size='small' onClick={()=>handleUpdateQty(item.id,item.quantity+1)}>+</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type="button" size='small' onClick={()=>handleUpdateQty(item.id,item.quantity-1)}>-</Button>
              </div>
              <Button variant='contained' type='button' color='secondary'  onClick={()=>removeItem(item.id)}>Remove</Button>
          </CardActions>
      </Card>
  )
}

export default CartItem