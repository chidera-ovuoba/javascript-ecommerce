import React from 'react'
import { Container,Typography,Button,Grid } from '@material-ui/core'
import useStyles from './styles';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';



const Cart = ({ cart, handleUpdateQty, removeItem, clearCart }) => {

    const classes = useStyles();
    const isEmpty = !cart?.line_items?.length;
  
    const EmptyCart = () => (
        <Typography variant='subtitle1'>There is no item in your shopping cart
            <Link to='/' className={classes.link}>start adding some</Link></Typography>
    )
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} removeItem={removeItem} handleUpdateQty={handleUpdateQty} />
                        </Grid>
                    ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>{cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' color='secondary' type='button' variant='contained' onClick={clearCart} >Empty Cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' color='primary' type='button' variant='contained' >Checkout</Button>
                </div>
            </div>
        </>
    )
  
    if (cart.line_items) {
        return (
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
                {
                    isEmpty ? <EmptyCart /> : <FilledCart />
                }
            </Container>
        )
    }
}

export default Cart