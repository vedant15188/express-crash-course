const express = require("express");
const members = require("../../Members");
const uuid = require("uuid");

const router = express.Router();

// Gets all members
router.get("/", (req, res) => {
	res.json(members);
});

// Get Single Member
router.get("/:id", (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ message: `No member with the id=${req.params.id}!` });
	}
});

// Create Member
router.post("/", (req, res) => {
	// res.send(req.body);

	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: "active"
	};

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ message: "Please include a name and email" });
	}

	members.push(newMember);
	// res.redirect("/");
	res.json(members);
});

// Update Member
router.put("/:id", (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		const updMember = req.body;
		members.forEach(member => {
			if (member.id === parseInt(req.params.id)) {
				member.name = updMember.name ? updMember.name : member.name;
				member.email = updMember.email ? updMember.email : member.email;

				res.json({ message: "Member was updated", member });
			}
		});
	} else {
		res.status(400).json({ message: `No member with the id=${req.params.id}!` });
	}
});

// Delete Member
router.delete("/:id", (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		res.json({
			message: "Member deleted!",
			members: members.filter(member => member.id !== parseInt(req.params.id))
		});
	} else {
		res.status(400).json({ message: `No member with the id=${req.params.id}!` });
	}
});

module.exports = router;
