const adminAuth = (req,res,next)=>{
  const token = 'abc';
  const isAdminAutherized = token === 'abc';
  if(!isAdminAutherized){
   return res.status(401).send('unauthorized he')
  }
  next();
};

const userAuth = (req,res,next)=>{
  const token = 'xxx';
  const isUserAuthenticate = token === 'xxx';
  if(!isUserAuthenticate){
    return res.status(401).send('user-unauthorized')
  }
  next();
}

module.exports = {
  adminAuth,
  userAuth,
}