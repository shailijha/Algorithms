const post = {
  _id: '5d576e524337c34cd177d85a',
  text: 'This is a test post by Tatshini. ',
  name: 'Tatshini',
  comments: [
    { _id: '5d58bb16fc591dbb80d62cc1', text: 'sample1' },
    { _id: '5d58b7c7f84ae09228fe364c', text: 'sample2' }
  ]
};

console.log(post.comments.findIndex(x => x._id === '5d58bb16fc591dbb80d62cc1'));
