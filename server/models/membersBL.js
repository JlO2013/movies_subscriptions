const Members = require('../models/memberModel')
  

const getMembers = () =>
{
  return Members.find({})
}

const getMember = (id) =>
{
  return Members.findById(id)
  
}
const getMemberByName = (Name) =>
{
  return Members.findOne(Name)
}

const addMember = async (newMember) =>
{
  const member = new Members(newMember);
  await member.save();
  return member._id
}

const updateMember = async (id, member) =>
{
  await Members.findByIdAndUpdate(id, 
  {
    Name : member.Name,
    Email : member.Email,
    City : member.City
  }  )

  return 'Updated succeeded'
}

const deleteMember = async (id) =>
{
  await Members.findByIdAndDelete(id)

  return 'Deleted succeeded'
}

module.exports = {getMembers, getMember, getMemberByName, addMember, updateMember, deleteMember}