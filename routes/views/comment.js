var Comment     = require('../../model/comment');
var mongoose    = require('mongoose');
var ObjectId 	= require('mongodb').ObjectID;



module.exports = {

    getAllComments: function(req, res) {
        Comment.find({}).populate('userDetails', {name: 1}).sort().exec(function(err, allComments) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.status(200).json(allComments)
        })
    },

    addComment: function(req,res) {
        var id = ObjectId(req.user._id);
        var singleComment= req.body.comment;
        singleComment.userDetails  = id;

        Comment.create(singleComment, function(err,comm) {
            if(err) {
                res.status(500).json(err);
                console.log(err);
                return;
            }

            return res.status(200).json(comm);
        });
    },

    upvote: function(req,res) {
        var id=ObjectId(req.body.comment_id);
        var old=Number(req.body.upvote);
        // console.log(req.body.)

        Comment.findByIdAndUpdate(id, {upvote : old+1 },function(err,upv) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.status(200).json(upv);
        });
    },

    downvote: function(req, res) {
        var id=ObjectId(req.body.comment_id);
        var old=Number(req.body.downvote);

        Comment.findByIdAndUpdate(id, {downvote : old+1 },function(err,dnv) {
            if(err) {
                console.log(err);
                res.status(200).json(err);
                return;
            }

            res.status(200).json(dnv);
        });
    }
}
