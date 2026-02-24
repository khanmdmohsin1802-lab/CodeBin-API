import Snippet from "../models/snippet.js";

function createSnippet(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

async function handleCreateSnippet(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and Content is required" });
    }

    const shortId = createSnippet(5);

    const newSnippet = await Snippet.create({
      shortId: shortId,
      title: title,
      content: content,
      createdBy: req.user._id,
    });

    console.log(newSnippet);

    return res.status(201).json({
      msg: " Snippet created successfully",
      id: shortId,
      link: `http://localhost:8001/bin/${shortId}`,
    });
  } catch (error) {
    console.log("Snippet creation error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetSnippet(req, res) {
  try {
    const shortId = req.params.shortId;

    const userSnippet = await Snippet.findOneAndUpdate(
      { shortId: shortId },
      { $inc: { views: 1 } },
      { returnDocument: "after" },
    );

    if (!userSnippet) {
      return res.status(404).json({ msg: "User not found with this short Id" });
    }

    res.status(201).json({
      title: userSnippet.title,
      content: userSnippet.content,
      views: userSnippet.views,
    });
  } catch (error) {
    console.log("Error fetching snippet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleDeleteSnippet(req, res) {
  try {
    const shortId = req.params.shortId;
    const userId = req.user._id;

    const userSnippet = await Snippet.findOne({ shortId: shortId });

    if (!userSnippet) {
      return res.status(404).json({ msg: "Snippet not found" });
    }

    if (userSnippet.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ warning: "You are forbidden" });
    }

    await Snippet.deleteOne({ shortId: shortId });
    return res.json({ msg: "snippet deeted successfully" });
  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetMySnippet(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const snippets = await Snippet.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await Snippet.countDocuments({
      createdBy: req.user._id,
    });
    const totalPages = Math.ceil(totalSnippets / limit);

    return res.status(200).json({
      curruntPage: page,
      totalPages: totalPages,
      totalSnippets: totalSnippets,
      data: snippets,
    });
  } catch (error) {
    console.log("Pagination error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {
  handleCreateSnippet,
  handleGetSnippet,
  handleDeleteSnippet,
  handleGetMySnippet,
};
