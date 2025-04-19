access(all) contract TeammateFinder {
    access(all) struct UserProfile {
        access(all) let id: UInt64
        access(all) let address: Address
        access(all) let skills: [String]
        access(all) let location: String
        access(all) let hackathonInterests: [String]

        init(id: UInt64, address: Address, skills: [String], location: String, hackathonInterests: [String]) {
            self.id = id
            self.address = address
            self.skills = skills
            self.location = location
            self.hackathonInterests = hackathonInterests
        }
    }

    access(all) let profiles: {Address: UserProfile}

    init() {
        self.profiles = {}
    }

    access(all) fun createProfile(skills: [String], location: String, hackathonInterests: [String]) {
        let profile = UserProfile(
            id: UInt64(self.profiles.length),
            address: self.account.address,
            skills: skills,
            location: location,
            hackathonInterests: hackathonInterests
        )
        self.profiles[self.account.address] = profile
    }
}