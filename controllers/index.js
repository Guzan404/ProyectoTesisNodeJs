
exports.getIndex = (req,res,next)=>{
  res.render('inicio/index', {
    pageTitle: 'Página Principal',
    path: '/',
    editing:false
  });
}
