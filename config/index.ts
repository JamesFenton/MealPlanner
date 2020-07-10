export default {
  mongoConnectionString: process.env.MONGO || 'mongodb://localhost/MealPlanner',
  jwtPrivateKey: process.env.JWT_KEY || 'jwtPrivateKey'
}