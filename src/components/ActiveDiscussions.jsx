export default function ActiveDiscussions(){
    const discussions = [
      { title: "Welcome Thread - v315", comments: 90 },
      { title: "Top Debugging Tools", comments: 12 },
      { title: "Meme Monday", comments: 45 },
    ];
  
    return (
      <div className="w-1/4 ml-5 bg-[#171717] text-white p-4 h-screen  right-0">
        <h2 className="text-2xl font-bold mb-4">Active Discussions</h2>
        <ul>
          {discussions.map((discussion, index) => (
            <li key={index} className="mb-2 text-xl cursor-pointer hover:text-blue-400">
              {discussion.title} ({discussion.comments} comments)
            </li>
          ))}
        </ul>
      </div>
    );
  };
  