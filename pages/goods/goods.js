import {Goods} from './goods-model.js';
import {Mobile} from '../../utils/mobile.js';
// import {Collection} from '../../utils/collection.js';

var goods = new Goods();
var mobile = new Mobile();
// var collect = new Collection();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:[],
    page : 0,
    size : 4,
    isLoading:false,
    hasMore:true, //还有更多数据
    loadingBtn:false,
    imgUrls: [{
      link:'/pages/good-detail/good-detail',
      img_url:'/imgs/goods/2018091416044786399.jpg'
    },
    {
      link: '/pages/contact-us/contact-us',
      img_url: '/imgs/goods/2018110115405144996.jpg'
    }],
    navItems:[
      {
        img_url:'/imgs/goods/nav-icon_01.png',
        text:'快速找药'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text:'在线咨询'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text: '在线咨询'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text: '在线咨询'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text: '在线咨询'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text: '在线咨询'
      },
      {
        img_url: '/imgs/goods/nav-icon_02_add.png',
        text: '在线咨询'
      }
    ],
    goodsList:[],
    autoplay:false
  },
  // 点击轮播图，去到对应的专题页
  goto_theme:function(){ 
      wx.navigateTo({
        url: '/pages/good-detail/good-detail',
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  // 初始化加载商品数据
  onLoad: function (options) {
    this.getGoods();
  
  },

  /** 加载更多 */
  onReachBottom(){
    if (!this.loadingBtn) {
      this.getGoods();
    }

    this.setData({
      loadingBtn: true
    })
    wx.showLoading({
      title: '拼命加载中！',
    })
    
  },
  /**加载更多商品 */
  getGoods(){
    let { size,page,goodsList} = this.data;
    this.setData({
      page:++page
    })
    
      wx.request({
        url: 'http://m.ykyao.com/ajax-shop/default/search.ajax?operFlg=2',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data:{
          rp: size,
          page:page
        },
        success:(res)=>{
          var allPage = Math.ceil(res.data.data.count / size)
          var moreData = res.data.data.goodsData;
          if (size * (page - 1) <= res.data.data.count){
            goodsList.push(...moreData);
            this.setData({
              goodsList: goodsList,
              loadingBtn: false
            })
            
          }else{
            wx.showToast({
              title: ' 我是有底线的',
            })
          }
          wx.hideLoading();
        }
      })
    }
})