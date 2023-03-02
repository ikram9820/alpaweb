import ProfileStats from "./ProfileStats";
const statusurl = "/images/img1.jpg";
const statusurl2 = "/images/img2.jpg";
const statuses = [
  { id: 1, url: statusurl },
  { id: 2, url: statusurl },
  { id: 3, url: statusurl2 },
  { id: 4, url: statusurl2 },
  { id: 5, url: statusurl },
  { id: 6, url: statusurl },
  { id: 7, url: statusurl2 },
];


function StatusesGrid() {
  return (
    <div className="text-center">
      <ProfileStats  />

      <div className="row row-cols-3">
        {statuses &&
          statuses.map((status) => {
            return (
              <div key={status.id} className="col">
                <img
                  className="pb-4 object-fit-cover"
                  src={status.url}
                  height={350}
                  width={380}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StatusesGrid;
