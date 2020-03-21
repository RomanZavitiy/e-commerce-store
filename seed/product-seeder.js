var Product = require('../models/product'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/OS");

var products = [
    new Product({
        imagePath: 'https://t.wallpaperweb.org/wallpaper/games/1920x1200/video_game_wallpapers_26.jpg',
        title: 'Unreal Tournament III',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cum aut enim dolore, quis odio odit libero dignissimos qui aperiam cumque minima deleniti doloremque. Inventore, temporibus! Nostrum incidunt doloremque magnam?',
        price: 60
    }),
    new Product({
        imagePath: 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2018/03/untitled-3jpg-684c55_1280w.jpg?quality=90&strip=all&zoom=1&resize=644%2C362&ssl=1',
        title: 'Call of Duty: Modern Warfare 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cum aut enim dolore, quis odio odit libero dignissimos qui aperiam cumque minima deleniti doloremque. Inventore, temporibus! Nostrum incidunt doloremque magnam?',
        price: 30
    }),
    new Product({
        imagePath: 'https://download.komputerswiat.pl/media/2019/183/8982616/minecraft-village-and-pillage-na-pc-i-mac.jpg',
        title: 'Minecraft',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cum aut enim dolore, quis odio odit libero dignissimos qui aperiam cumque minima deleniti doloremque. Inventore, temporibus! Nostrum incidunt doloremque magnam?',
        price: 55
    }),
    new Product({
        imagePath: 'https://cdn-cf.gamivo.com/image_cover.jpg?f=907&n=6f9a60e0-784e-11e7-8203-abacaa3272cd.jpg&h=e61623b56cb06069674590a8f30b16e2',
        title: 'Mortal Kombat X',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cum aut enim dolore, quis odio odit libero dignissimos qui aperiam cumque minima deleniti doloremque. Inventore, temporibus! Nostrum incidunt doloremque magnam?',
        price: 35
    }),
    new Product({
        imagePath: 'https://imgs.classicfm.com/images/61630?width=1000&crop=16_9&signature=UOxsAc4VhzNYQEIG-RTXur_mix8=',
        title: 'Space cakes everywhere!',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cum aut enim dolore, quis odio odit libero dignissimos qui aperiam cumque minima deleniti doloremque. Inventore, temporibus! Nostrum incidunt doloremque magnam?',
        price: 40
    })
];

var done = 0;
for (var i = 0; i < products.length; i++){
    products[i].save(function(err, res) {
        done++;
            if (done === products.length){
                exit();
            }
    });
}

function exit() {
    mongoose.disconnect();
} 