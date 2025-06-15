var express = require('express');
var router = express.Router();

// メモリ上のユーザーデータ
let users = [
  { id: 1, name: 'Taro' },
  { id: 2, name: 'Jiro' }
];

// ユーザー一覧取得
router.get('/', function(req, res) {
  res.json(users);
});

// ユーザー詳細取得
router.get('/:id', function(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// ユーザー新規作成
router.post('/', function(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const newUser = { id: users.length ? users[users.length-1].id + 1 : 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ユーザー更新
router.put('/:id', function(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  user.name = name;
  res.json(user);
});

// ユーザー削除
router.delete('/:id', function(req, res) {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
