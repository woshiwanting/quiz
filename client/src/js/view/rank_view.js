/**
 * @description 排行榜
 * @time 2016.11.28 20.02
 */

var rankTpl = require('../tpl/rank.tpl');
var ScoreModel = require('../model/score_model.js');

var rankView = Backbone.View.extend({
  el: '#container',
  events: {
    
  },
  template: rankTpl,
  initialize: function() {
    // this.user = $('#J-userinfo').data('user');
    this.model = new ScoreModel;
  },
  //获取自己的分数
  getSelfScore: function() {
    this.model.fetch({
      url: '/quiz/v1/api/scores/' + user.unionid
    })
    .then(function(scores) {
      scores.forEach(function(score, index) {
        $('#J-selfRank').text(score.rank);
        $('#J-selfScore').text(formatTime(score.expended_time));
      })
    })
  },
  render: function() {
    this.model.fetch()
    .then(function(result) {
      var tpl = _.template(this.template)({
        users: result,
        self: user
      });
      this.$el.html(tpl);
      this.getSelfScore();
    }.bind(this));
  }
});

module.exports = rankView;