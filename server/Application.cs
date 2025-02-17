namespace AuthServer
{
    public class Application
    {
        public string? Name { get; set; }

        public string? Author { get; set; }
        
        public string? GitHubUrl { get; set; }
        
        // public string? Version { get; set; }
        
        // public string? Technology { get; set; }

        public Application(){
            Name="fullStackProject";
            Author="chany";
           GitHubUrl="https://github.com/chany-ir/fullStackProject";
        }
    }

}
